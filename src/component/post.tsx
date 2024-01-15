import '../share.css'

function post(){
    return(
        <>
          <div id="share">
            <div id="share-head">
                <p id="share-font">Share</p>   
                <p id="share-servefont">Connecting with people</p>
            </div>
            <div id='share-content'>
                <div id="share-content-user">
                    <p>USER Name</p>
                    <p>D+</p>
                </div>
                <div id='post-content'>
                    <div id='post-post1'>
                        <p>Community</p>
                    </div>
                    <div id='post-post2'>
                        <p>Title:</p>
                        <input type='text'></input>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default post;