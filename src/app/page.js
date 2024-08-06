import ApnaZila from "@/components/ApnaZila";
import NewsSection from "@/components/news-section/news.section.component";

export default async function Page() {
    console.log("process.env.NEXT_PUBLIC_SERVER_DOMAIN", process.env.NEXT_PUBLIC_SERVER_DOMAIN)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/home`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify({
            data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
        }),
    });

    let news = []
    if (response.ok) {
        news = await response.json();
    }

    if (news.success === false) {
        news.data = [{ data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }]
    }

    return (
        <main className="bg-red-200">
            <div className="flex spacing mt-2 ">
                <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-5 ">
                    <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden bg-white">
                        {
                            news && news.data &&
                            <NewsSection data={news.data[0].data} title={news?.data[0]?.title} />
                        }

                    </div>
                    <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2">
                        {/* <CustomeAndGoogleAdd /> */}
                        {/* <SideNews title={"read also"} /> */}
                    </div>
                </div>
            </div>

            <ApnaZila />




            {news && news.data && news.data.length > 4 && (
                <div className="flex spacing mt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full">
                        <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
                            {news.data.slice(4).map((news, index) => (
                                <NewsSection key={index} data={news.data} title={news.title} />
                            ))}
                        </div>
                        <div className="col-span-2 w-full">
                            <div className="sticky top-32 max-md:hidden">
                                {/* <CustomeAndGoogleAdd /> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}