import {useQuery, UseQueryResult} from "react-query";
import {allBlogposts, IBlogPost} from "./api/directus";
import {Link} from "react-router-dom";
import {ManyItems} from "@directus/sdk";
import MetaTag from "./MetaTag";

const Blogposts = () => {
  const dateOptions :Intl.DateTimeFormatOptions = {year: "numeric", month: 'long', day: '2-digit'};

  const {status, data, error} : UseQueryResult<ManyItems<IBlogPost>, Error> = useQuery("blogposts",allBlogposts);

  switch (status) {
    case "idle":
      return <div>idle</div>;
    case 'loading': return <span>Loading...</span>
    case 'error':
      return <span>Error: {error.message}</span>

    case "success": return <div className="text-center mt-2 flex items-center justify-center">
        <ul className="group  list-none max-w-screen-sm max-w-full justify-center ">
          {data.data != undefined && data.data.length > 0 ?
              data.data.map((post, key) => <Link key={key} to={post.id!.toString()}>
                <li className="border-black dark:bg-gradient-to-r dark:transition-all dark:ease-in-out dark:delay-150
                dark:duration-200 hover:dark:to-gray-500
                text-sm md:text-xl dark:from-gray-800 dark:to-black flex md:h-18
                justify-center md:justify-between dark:border-gray-50 border-b-2 border-solid">
                  <div className="flex flex-col justify-between text-left ml-1.5">
                    <span className="font-extrabold">{post.title!}</span>
                  <span className="text-xs">{new Date(post.date_created!).toLocaleDateString("de-DE", dateOptions)}</span>
                  </div>
                  <div className="hidden md:flex md:flex-wrap justify-self-end md:flex-row-reverse w-1/3 py-1 h-fit gap-1 mr-2">{post.tags?.map((tag,key) => {
                      if(tag !== undefined)
                        return <MetaTag key={key} tag={tag}/>
                    }
                )}
                  </div>
              </li></Link>) : <li>No Blogposts yet :( </li>}
        </ul>
      </div>
    }
}
export default Blogposts;