
import {DiscussionEmbed} from "disqus-react"
  
const Comments = (second) => {

console.log(second)
  const disqusShortname = "topstarter"
  
  const disqusConfig = {
    url: "http://localhost:3001/dfasdf",
     
    title: second.second.CampaignName
  }
  
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
  
export default Comments;