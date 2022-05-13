import React, { useState,useEffect } from "react";
import { observer } from "mobx-react";
import MainStore from "../store/MainStore";
import { useNavigate } from "react-router";

const Bookmark = observer(() => {
    const [store] = useState(() => new MainStore)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    const [pos, setPos] = useState(0)

    useEffect(() => {
        store.getMarked(pos);
    },[])

    return (<>
        <button onClick={() => {
            navigate('/news')
        }}>Back</button>
        <div id='instruments'>
        
        </div>
        <div className='news_list'>          
                
            {store.sameNews.map((news) => {
                return <div className='single_news' onClick={() => {
                    navigate(`/news/${news.id}`);
                }}>
                    <br />
                    <img className="small_img" src={news.imageUrl} />
                    <div className='inner_text'>
                        <h3 className='title'>{news.title}</h3>
                        {news.summary}<br /><br />
                        <i>{news.publishedAt.replace('T', ' ').split('.')[0]}</i>
                    </div>
                    <br />
                </div>;

            })}
        </div>
        <button onClick={() => {
            pos > 0 ? setPos(pos - 10) : setPos(pos);
            store.saveApps(pos,setLoading);
            console.log(pos);
        }}>Previous page</button>
        <button onClick={() => {
            setPos(pos + 10);
            store.saveApps(pos,setLoading);
            console.log(pos);
        }}>Next page</button>

    </>);
});

export default Bookmark