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
    console.log("responseeeeeeeeeeeee",response)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    
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

      try {
        const { getIo } = require('../socket')
        const io = getIo()
        if (io) {
          
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