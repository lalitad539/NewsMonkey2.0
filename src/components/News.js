import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
        apiKey: ''
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            error: null
        };
        document.title = `${this.props.category} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const { country, category, pageSize, apiKey } = this.props;
        const { page } = this.state;

        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=1db1fe36697b4d489520e69d7db873cc`;

        this.setState({loading: true,
        });

        try {
            let response = await fetch(url);

            // if (!response.ok) {
            //     throw new Error(`HTTP error: ${response.status}`);
            // }

            let parsedData = await response.json();

            console.log("News API response:", parsedData);

            if (parsedData.status !== "ok") {
                throw new Error(
                    parsedData.message || "Unable to fetch news"
                );
            }

            this.setState((prevState) => ({
                articles:
                    page === 1
                        ? parsedData.articles
                        : [...prevState.articles, ...parsedData.articles],

                totalResults: parsedData.totalResults,
                loading: false
            }));

            this.props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);

            this.setState({
                loading: false,
                error: error.message
            });
        }
    }

    componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = () => {
        this.setState(
            (prevState) => ({
                page: prevState.page + 1
            }),
            () => {
                this.updateNews();
            }
        );
    };

    render() {

        return (
            <div
                className="container my-4"
                style={{ marginTop: "70px" }}
            >

                <h1 className="text-center">
                    NewsMonkey - Top Headlines
                </h1>

                {this.state.error && (
                    <div className="alert alert-danger" role="alert">
                        <strong>Error:</strong> {this.state.error}
                    </div>
                )}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={
                        this.state.articles.length < this.state.totalResults
                    }
                    loader={
                        <h4 className="text-center">
                            Loading...
                        </h4>
                    }
                    endMessage={
                        <p className="text-center">
                            <b>You have seen all the news!</b>
                        </p>
                    }
                >
                    <div className="container">
                    <div className="row">

                        {this.state.articles.map((element) => {

                            return (
                                <div
                                    className="col-md-4"
                                    key={
                                        element.url ||
                                        element.title
                                    }
                                >

                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source?.name}
                                    />

                                </div>
                            );

                        })}
                    </div>
                    </div>

                </InfiniteScroll>

            </div>
        );
    }
}

export default News;