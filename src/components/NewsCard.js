import React from 'react'

const NewsCard =(props)=>  {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div >
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}</span>
          </div>
          <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-110535246,width-1200,height-630,imgsize-267022,overlay-etmarkets/photo.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div mode={props.mode} togglemode={props.toggleMode} style={{backgroundColor: props.mode==='light'?'black':'light', color: props.mode === 'light'?'black':'black'}} className="card-body"> <h5 className='card-title'>{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {!author ? 'unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsCard