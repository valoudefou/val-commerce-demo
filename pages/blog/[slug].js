import { createClient } from 'contentful';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_TOKEN,
});

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'articles',
    });

    const paths = res.items.map((item) => {
        return {
            params: { slug: item.fields.slug },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'articles',
        'fields.slug': params.slug,
    });

    return {
        props: { articles: items[0] },
    };
}

export default function Article({ articles }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow py-5 px-5">
                <div className="flex flex-col">
                    <h1 className="text-4xl p-5 place-self-center font-semibold">{articles.fields.titleV2}</h1>
                    <h2 className="text-2xl p-5 font-medium">{articles.fields.title}</h2>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                    <div className="flex">
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                        <div className="divider divider-horizontal"></div>
                        <p className="p-5 text-justify">{articles.fields.content}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
