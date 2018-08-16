import React, { Component } from 'react';
import Twitter from './twitter.svg';
import Email from './email.svg';
import Linkedin from './linkedin.svg';
import Facebook from './facebook.svg';

class socialShare extends Component{



render(){
    return(
        <span className="sharetext">Share this Quiz: 
          <a href="https://www.facebook.com/dialog/feed?app_id=184683071273&link=https%3A%2F%2Fwww.accountingtoday.com%2Fbest-accounting-firms-quiz&picture=http%3A%2F%2Fsource-media-brightspot-lower.s3.amazonaws.com%2Fef%2Fe3%2Fc52b289f463783433d309fc4f84d%2Fbest-accounting-firms-to-work-for-quiz.jpeg&name=Best%20Accounting%20Firms%20to%20Work%20For%20Quiz%20%7C%20Accounting%20Today&caption=%20&description=Are%20you%20working%20for%20the%20best%20accounting%20firm%3F%20Take%20the%20Accounting%20Today%20quiz%20and%20found%20out.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F" target="_blank" rel="noopener noreferrer" onClick={() => {this.props.reactClickEvent("Social - Facebook")}}>
          <img src="//assets.sourcemedia.com/1e/bd/fd6b3c8646eab39e28f5e5ec4932/facebook.3351fedf.svg" className="share--item" alt="facebook"/>
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//www.accountingtoday.com/best-accounting-firms-quiz&title=Best%20Accounting%20Firms%20to%20Work%20For%20Quiz&summary=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.&source=" target="_blank" rel="noopener noreferrer" onClick={() => {this.props.reactClickEvent("Social - Linkedin")}}><img src="//assets.sourcemedia.com/13/73/f9bfa3f74b9cb5540ee23ade3eca/linkedin.9edd0ee4.svg" className="share--item" alt="linked in"/></a>
          <a href="https://twitter.com/home?status=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.%20https%3A//www.accountingtoday.com/best-accounting-firms-quiz" target="_blank" rel="noopener noreferrer" onClick={() => {this.props.reactClickEvent("Social - Twitter")}}><img src="//assets.sourcemedia.com/7d/ba/391a678b4238b0adcbbd730866b4/twitter.b4f32770.svg" className="share--item" alt="twitter"/></a>
          <a href="mailto:?Subject=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.&Body=I%20just%20took%20this%20quiz%20to%20see%20if%20my%20firm%20is%20one%20of%20the%20best%20firms%20to%20work%20for%20in%20accounting.%20Check%20it%20out.%20https%3A//www.accountingtoday.com/best-accounting-firms-quiz" target="_blank" rel="noopener noreferrer" onClick={() => {this.props.reactClickEvent("Social - Email");}}><img src="//assets.sourcemedia.com/2e/72/fd9f608e46eba9c3fc8394b3cbfb/email.a2e2476a.svg" className="share--item" alt="email"/></a>
          </span>
    )
}
}

export default socialShare;