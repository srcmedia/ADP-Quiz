import React, { Component } from 'react';


class socialShare extends Component{



render(){
    return(
        <span className="sharetext">Share this Quiz: 
          <a href="https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Fwww.accountingtoday.com%2Fbest-accounting-firms-quiz&picture=http%3A%2F%2Fsource-media-brightspot-lower.s3.amazonaws.com%2Fef%2Fe3%2Fc52b289f463783433d309fc4f84d%2Fbest-accounting-firms-to-work-for-quiz.jpeg&name=Best%20Accounting%20Firms%20to%20Work%20For%20Quiz%20%7C%20Accounting%20Today&caption=%20&description=Are%20you%20working%20for%20the%20best%20accounting%20firm%3F%20Take%20the%20Accounting%20Today%20quiz%20and%20found%20out.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F" target="_blank" rel="noopener noreferrer" onClick={() => {this.reactClickEvent("Social - Facebook")}}><img src='http://source-media-brightspot-lower.s3.amazonaws.com/f4/76/45b2097c4d4fb3897e9a2ee8d095/facebook.svg' className="share--item" alt="facebook"/></a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//www.accountingtoday.com/best-accounting-firms-quiz&title=Best%20Accounting%20Firms%20to%20Work%20For%20Quiz&summary=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.&source=" target="_blank" rel="noopener noreferrer" onClick={() => {this.reactClickEvent("Social - Linkedin")}}><img src='http://source-media-brightspot-lower.s3.amazonaws.com/a5/e2/0204dac1480caf5f64f1f31d1e9e/linkedin.svg' className="share--item" alt="linked in"/></a>
          <a href="https://twitter.com/home?status=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.%20https%3A//www.accountingtoday.com/best-accounting-firms-quiz" target="_blank" rel="noopener noreferrer" onClick={() => {this.reactClickEvent("Social - Twitter")}}><img src='http://source-media-brightspot-lower.s3.amazonaws.com/14/01/bfa170354b7590f553e17a2b8c85/twitter.svg' className="share--item" alt="twitter"/></a>
          <a href="mailto:?Subject=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.&Body=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.%20https%3A//www.accountingtoday.com/best-accounting-firms-quiz" target="_blank" rel="noopener noreferrer" onClick={() => {this.reactClickEvent("Social - Email");}}><img src='http://source-media-brightspot-lower.s3.amazonaws.com/75/d2/3650f4f84c35897c88b457a8ae4a/email.svg' className="share--item" alt="email"/></a>
          </span>
    )
}
}

export default socialShare;