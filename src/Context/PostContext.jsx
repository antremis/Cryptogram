import { createContext, useContext, useState } from "react";
import { notify } from "../Components/Alert";
import {v4 as uuid} from 'uuid'

const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const [posts, setPosts] = useState([
        {
            id: uuid(), 
            displayName: "Yatin Bajaj",
            handle: 'yatinOP69',
            imgsrc: '/src/assets/stockimg.png',
            likes: 2814,
            caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta adipisci quidem nostrum reiciendis quisquam fuga corporis, voluptas vero tempore?',
            comments: [
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio?',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis numquam omnis ex dolorum alias laborum neque enim, labore iste?',
                            likes: 0,
                        },
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, porro!',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi quos velit adipisci. Repellat consectetur doloribus sunt quaerat odit qui?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel quidem! Possimus et sapiente voluptate?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit temporibus odio quos provident expedita rem, atque odit dolores unde alias totam dignissimos cumque eius id aliquid omnis aperiam placeat quibusdam in rerum officiis! Obcaecati, sapiente.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
            ]
        },
        {
            id: uuid(),
            displayName: "Yatin Bajaj",
            handle: 'yatinOP69',
            imgsrc: '/src/assets/stockimg.png',
            likes: 2814,
            caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta adipisci quidem nostrum reiciendis quisquam fuga corporis, voluptas vero tempore?',
            comments: [
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio?',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis numquam omnis ex dolorum alias laborum neque enim, labore iste?',
                            likes: 0,
                        },
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, porro!',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi quos velit adipisci. Repellat consectetur doloribus sunt quaerat odit qui?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel quidem! Possimus et sapiente voluptate?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit temporibus odio quos provident expedita rem, atque odit dolores unde alias totam dignissimos cumque eius id aliquid omnis aperiam placeat quibusdam in rerum officiis! Obcaecati, sapiente.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
            ]
        },
        {
            id: uuid(),
            displayName: "Yatin Bajaj",
            handle: 'yatinOP69',
            imgsrc: '/src/assets/stockimg.png',
            likes: 2814,
            caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta adipisci quidem nostrum reiciendis quisquam fuga corporis, voluptas vero tempore?',
            comments: [
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio?',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        },
                        {
                            reply: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis numquam omnis ex dolorum alias laborum neque enim, labore iste?',
                            likes: 0,
                        },
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, porro!',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi quos velit adipisci. Repellat consectetur doloribus sunt quaerat odit qui?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel quidem! Possimus et sapiente voluptate?',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
                {
                    handle: 'admin',
                    comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit temporibus odio quos provident expedita rem, atque odit dolores unde alias totam dignissimos cumque eius id aliquid omnis aperiam placeat quibusdam in rerum officiis! Obcaecati, sapiente.',
                    replies: [
                        {
                            reply: 'Lorem ipsum dolor sit amet.',
                            likes: 0,
                        }
                    ],
                    likes: 0,
                },
            ]
        },
    ])
    const [loading, setLoading] = useState(true)

    return(
        <PostContext.Provider value={{posts, loading}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;
export const usePostContext = () => {
    if(!PostContext) notify('Post context is not available');
    return useContext(PostContext)
}