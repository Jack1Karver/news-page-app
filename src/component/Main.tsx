import MainStore from '../store/MainStore';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { News } from '../store/MainStore';
import { useNavigate } from 'react-router-dom';


const Main = observer(() => {
    const [store] = useState(() => new MainStore());
    const navigate = useNavigate();
    const [pos,setPos] = useState(0)
    const [search, setSearch] = useState('')
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
        store.saveApps(pos,setLoading);

    },[])
    //&_sort=publishedAt

    return (<>
        <h1>Новости</h1>
        <div id='instruments'>
            <input type='text' placeholder='search' onChange={(e)=>{setSearch(e.target.value)}}></input>
            <button onClick={() => {
                setPos(0)
                store.searchApps(pos,search,setLoading)
            }}>Search</button>
            <button onClick={() => {
                navigate(`bookmarks`)
            }}>Bookmark</button>

        </div> 
        <div className='loader' hidden = {loading}>
            <b>Loading...</b>
        </div>
        <div className='news_list'>                     
        {
            store.apps.map((news: News) => {
                return <div className='single_news' onClick={() => {
                    navigate(`/news/${news.id}`);
                }}>
                    <br />
                    <img className ="small_img" src={news.imageUrl} />
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
            pos > 0 ? setPos(pos - 10):setPos(pos)            
            store.saveApps(pos,setLoading);
        }}>Previous page</button>
        {pos/10+1}
        <button onClick={() => {
            const newPos = pos+10
            setPos(pos + 10);            
            store.apps = []
            store.saveApps(newPos,setLoading);
        }}>Next page</button>

        <button onClick={() => {
            navigate('/about')
        }}>About</button>
    </>);
});

export default Main;