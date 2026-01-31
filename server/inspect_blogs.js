const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function inspectBlogs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const Blog = mongoose.model('Blog', new mongoose.Schema({
            title: String,
            content: String,
            content_hi: String
        }));

        const blogs = await Blog.find();
        console.log(`Found ${blogs.length} blogs.`);

        for (const blog of blogs) {
            console.log(`--- Blog: ${blog.title} ---`);
            console.log(`Content Length: ${blog.content?.length || 0}`);
            console.log(`Content_hi Length: ${blog.content_hi?.length || 0}`);

            if (blog.content && blog.content.includes('data:image')) {
                const imgCount = (blog.content.match(/data:image/g) || []).length;
                console.log(`Found ${imgCount} base64 images in content.`);
            }

            if (blog.content && blog.content.length > 10000) {
                console.log('Content is very large. Snippet of first 200 chars:');
                console.log(blog.content.substring(0, 200));
            }
        }

        process.exit(0);
    } catch (err) {
        console.error('Inspection error:', err);
        process.exit(1);
    }
}

inspectBlogs();
