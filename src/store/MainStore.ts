import axios from 'axios';
import { action, makeAutoObservable, observable, observe, runInAction } from 'mobx';

export interface News {
    id: number;
    featured: boolean,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: string,
    launches: [
        {
            id: string,
            provider: string;
        }
    ],
    events: [
        {
            id: string,
            provider: string;
        }
    ];
}

export const api = axios.create({
    baseURL: 'http://api.spaceflightnewsapi.net/v3'
});


export default class MainStore {

    apps: News[] = [];
    sameNews: News[] = [];
    news: News = {
        id: null,
        featured: false,
        title: '',
        url: '',
        imageUrl: '',
        newsSite: '',
        summary: '',
        publishedAt: '',
        launches: [
            {
                id: '',
                provider: ''
            }
        ],
        events: [
            {
                id: '',
                provider: ''
            }
        ]
    };

    constructor() {
        makeAutoObservable(this, {
            news: observable,
            getNews: action,
            saveApps: action,
            apps: observable
        });
    }

    saveApps = (pos, func) => {
        func(false)
        console.log(pos);
        api.get(`/articles?_limit=10&_start=${pos}`).then((res) => {
            runInAction(() => {
                this.apps = res.data;
                func(true)
            });
        });
    };

    getMarked = (pos) => {
        let id_arr: string[] = JSON.parse(localStorage.getItem('id_arr'));
        id_arr.splice(0, pos);
        id_arr.forEach(value => {
            api.get(`/articles/${value}`).then(action(res => {
                console.log(res.data);
                this.sameNews.push(res.data);
            }));
        });

    };

    searchSame = () => {
        let str = this.news.title.split(' ').shift();
        api.get(`/articles?_limit=10&title_contains=${str}&id_ne=${this.news.id}`).then(action((res => {
            this.sameNews = res.data;
        })));

    };

    saveBookMark = () => {
        let str = new Set();
        let strArr: string[] = JSON.parse(localStorage.getItem('id_arr'));

        strArr ? strArr.push(`${this.news.id}`) : strArr = [`${this.news.id}`];
        strArr.forEach((val) => {
            if (val != 'null') {
                str.add(val);
            }
        });
        console.log(str);
        strArr = [];
        str.forEach((val: string) => {
            strArr.push(val);
        });
        console.log(strArr);
        localStorage.setItem('id_arr', JSON.stringify(strArr));
    };

    searchApps = (pos, contains, func) => {
        func(false)
        api.get(`/articles?_limit=10&_start=${pos}&title_contains=${contains}&summary_contains=${contains}`).then((res) => {
            runInAction(() => {
                this.apps = res.data;
                func(true)
            });
        });
    };

    getNews = (id) => {
        api.get(`/articles/${id}`).then(action(res => {
            this.news = res.data;
        }));
    };
}

