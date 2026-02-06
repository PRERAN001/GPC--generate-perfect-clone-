const {Inngest }=require("inngest")
const inngest=new Inngest({id:"rabbitz"})
const rabbitzuser = require("../model/rabbitz.model.js");
const build=(data)=>{
 let html=data.html.replace(/\\n/g, '\n')
 
 html = html.replace(/<link.*?stylesheet.*?>/g, `<style>${data.css}</style>`).replace(/\\n/g, '\n')
    html = html.replace(/<script.*?src=.*?><\/script>/g, `<script>${data.js}<\/script>`).replace(/\\n/g, '\n')
    return html

}
const gererate=inngest.createFunction({id:"generate"},{
    event:"build/build"
},async({event,step})=>{   
  const url =
    "https://openrouter.ai/api/v1/responses";
  const options = {
    method: "POST",
    headers: { 
        "Authorization": `Bearer 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`,
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
    model: 'arcee-ai/trinity-large-preview:free',
    input: `Return response in JSON:
        {
        "html": "",
        "css": "",
        "js": ""
        } 
        ${event.data.prompt}`,
    max_output_tokens: 9000,
  }),

  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();      
    console.log(data.output[0].content[0].text);
    const html=build(JSON.parse(data.output[0].content[0].text.replace(/```json/g, "")
  .replace(/```/g, "")
  .trim()))
  
  await step.run("db step",async()=>{
    const user=await rabbitzuser.findOne({name:event.data.name})
    let prompt=event.data.prompt

    if(user){
      await rabbitzuser.findOneAndUpdate({name:event.data.name},{
        $push:{
          details: {prompt, result:html }
        }
      },
    { upsert: true, new: true })

      // Emit socket event to notify frontend that build is ready
      try {
        const { getIo } = require('../socket')
        const io = getIo()
        if (io) {
          // emit to a room named after the user so only that user's clients receive it
          io.to(event.data.name).emit('build_done', { name: event.data.name, html })
        }
      } catch (e) {
        console.error('Socket emit error:', e)
      }
    }
  })


    return html
  } catch (error) {
    console.error(error);
  }

})

const functions=[gererate]

module.exports={inngest,functions}