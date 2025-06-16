import Post from "../models/Post.js";

export const getAllBlogs = async (req,res)=>{
    try {
        
        const posts = await Post.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 })

        if(posts.length===0){
            return res.status(200).json({
                message: 'No blogs available'
            })
        }

        res.status(200).json({
            message: 'All blogs fetched successfully',
            'Total blogs fetched' : posts.length,
            posts,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const getBlogById = async (req,res)=>{
    try {
        
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate('author', 'name email')

        if(!post){
            return res.status(404).json({ 
                message: 'Post not found'
            });
        }

        res.status(200).json({
            message: 'Blog fetched successfully',
            post,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const createBlog = async (req,res)=>{
    try {
        
        const { title, content } = req.body;

        if (!title || !content) {
            return req.status(400).json({
                message: 'Title and content are required'
            });
        }

        const newPost = new Post({
            title,
            content,
            author: req.user,
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
            id: savedPost._id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const editBlogById = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const { id } = req.params

        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if(post.author.toString() !== req.user){
            return res.status(403).json({
                message: "You don't have access to edit this blog"
            })
        }

        if(title) post.title = title;
        if(content) post.content = content;

        const updatedPost = await post.save();

        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const deleteBlogById = async (req,res)=>{
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if(post.author.toString() !== req.user){
            return res.status(403).json({
                message: "You don't have access to delete this blog"
            })
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Post deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}