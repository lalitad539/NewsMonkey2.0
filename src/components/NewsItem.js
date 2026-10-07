import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let{title,description,imageUrl,newsUrl,author,date,source}= this.props;

        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{ 
                        display: 'flex',
                        // justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                        fontweight: '600',
                        fontsize:'12px',
                        lineHeight:'1.2',
                        color:'white',
                        borderRadius:'5px'

                     }
                     }>

                    <span className=' squared-pill bg-danger ' >{source}</span>
                     </div>
                    <img src={imageUrl?imageUrl:"https://ichef.bbci.co.uk/news/1024/branded_news/ed59/live/fd296c40-5fac-11f1-b5ab-a55eacf8090d.jpg"} className="card-img-top" alt="news" />

                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                            <p className="card-text"><small className='text-muted'>By{!author?'Unknown': author} on {new Date(date).toGMTString()}</small></p>

                        <a href= {newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
