import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeCategory = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ee1fb710b61e49e598fdd64bc64b6355&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeCategory(props.category)} - GetNews`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    // async componentDidMount() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aea08ccff5446ce9dd715767eff7343&page=1&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });

    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage({ page: page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

    // nextClick = async () => {

    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

    //     // }

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aea08ccff5446ce9dd715767eff7343&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    // setPage(page + 1);
    // updateNews();
    // }
    // prevClick = async () => {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aea08ccff5446ce9dd715767eff7343&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     //     this.setState({ loading: true })
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();

    //     //     this.setState({
    //     //         page: this.state.page - 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    // setPage(page - 1);
    // updateNews();
    // }
    return (
        <>

            <h1 style={{backgroundColor: props.mode==='light'?'black':'light', color: props.mode === 'dark'?'light':'dark'}}>GetNews - Top {capitalizeCategory(props.category)}  Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => {
                            return <div  className='col-md-4' key={element.url}>
                                <NewsCard title={element.title} source={element.source.name} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} mode={props.mode}/>
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
        </>

        //      <div className='container d-flex justify-content-between mb-2 my-2'>
        //         <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevClick}>&larr;Previous</button>
        //         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>&rarr;Next</button>
        //     </div> *
        // </div>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: '6',
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News