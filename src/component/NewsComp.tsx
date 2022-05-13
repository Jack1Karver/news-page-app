import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import MainStore from "../store/MainStore";
import { News } from "../store/MainStore";

const NewsComp = observer(() => {
    const [store] = useState(() => new MainStore());
    const params = useParams();
    const [disable, setDisable] = useState(true)
    const navigate = useNavigate()


    const saveData = () => {
        store.getNews(params.id);
        store.searchSame();
    };

    let ignore = false
    if (!ignore) {
        saveData();
        ignore = true
    }
    
    const setActive=()=>{
        setDisable(false)
    }
    
    
    return (<>   
        <br /><br />
        <button onClick={() => {
            navigate('/news')
        }}>back</button>
        <button disabled={disable} onClick={() => {
            store.saveBookMark()
        }}>Bookmark</button>
        <div className="single_news"> 
            <img className='inner_img'src={store.news.imageUrl} ></img>
            <h2>{store.news.title}</h2>
            {store.news.summary}
            <br></br><a href={store.news.url}>Источник</a>
            <br/>{store.news.publishedAt.replace('T',' ').split('.')[0]}
        </div>
        <div className="singleNews">
            {
                store.sameNews.map((news: News) => {
                    return <div className='single_news' onClick={() => {
                        navigate(`/news/${news.id}`);
                    }}>
                        <br />
                        <img onLoad={setActive} className="small_img" src={news.imageUrl} />
                        <div className='inner_text'>
                            <h3 className='title'>{news.title}</h3>
                            {news.summary}<br />
                            
                        </div>
                        <br />
                    </div>;

                })}
        </div>
    </>);

});

export default NewsComp;