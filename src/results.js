import React, { Component } from 'react';

class Results extends Component{
    
    render(){
        let firmSize = this.props.firmSize;
        let total = this.props.Total;
        let Result = null;

        if(firmSize === 0){
            if(total<4) {
                Result = <div><p>Your small firm must make some changes if it is going to successfully compete in today’s business environment. Here are a number of places to start:</p><p>Small firms that make the Top 100 Best Firms to Work For list are offering employees a range of benefits including:</p><ul><li>Sharing information about how the firm is doing financially</li><li> Flexible hours or compressed work weeks</li><li>Tuition reimbursement or assistance for additional degrees or credentials</li><li>Matches employee contributions to a retirement savings plans account</li></ul><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm improve talent acquisition and retention, including:</p><p>HR Myths ebook<br/>Winning the War on Talent ebook<br/>The human touch<br/>Finding Happiness and Success at Work</p></div>;
            }
            if(total > 3 && total < 7) {
                Result = <div><p>Maintaining a competitive edge is challenging for companies today, especially smaller firms that may be battling budget constraints and a lack of resources. However, there are some steps you can take to become an employer of choice. Here are a number of places to start:</p><p>Small firms that make the Top 100 Best Firms to Work For list are offering employees a range of benefits including:</p><ul><li>Sharing information about the firm is doing financially</li><li>Flexible hours or compressed work weeks</li><li>Telecommuting options</li><li>Invites employees’ immediate families invited to firm events</li><li>Tuition reimbursement or assistance for additional degrees or credentials</li><li>Matches employee contributions to a retirement savings plans account</li></ul></div>;
            }
            if(total > 6){
                Result = <div><p>Congratulations! Your firm may be small but it’s mighty and is among the best of the best among small firms.</p><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm continue to be a best firm to work for, including:</p><ul><li>Sharing information about the firm is doing financially</li><li>Flexible hours or compressed work weeks</li><li>Telecommuting options</li><li>Invites employees’ immediate families invited to firm events</li><li>Tuition reimbursement or assistance for additional degrees or credentials</li><li>Matches employee contributions to a retirement savings plans account</li></ul></div>;
            }
        }
        else if(firmSize === 1){
            if(total < 4){
                Result = <div><p>Your firm must make some changes if it is going to successfully compete in today’s business environment. Here are a number of places to start:</p><p>Mid-size firms that make the Top 100 Best Firms to Work For list are offering employees a range of benefits including but not limited to:</p><ul><li>Sharing information about how the firm is doing financially</li><li>Telecommuting options</li><li>Invites employees’ immediate families invited to firm events</li><li>Personal development or stress management workshops or classes</li><li>Matches employee contributions to a retirement savings plans account</li></ul><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm improve talent acquisition and retention, including:</p><p>HR Myths ebook<br/>Winning the War on Talent ebook<br/>The human touch<br/>Finding Happiness and Success at Work</p></div>;
            }
            if(total > 3 && total < 7){
                Result = <div><p>Don’t let your mid-size firm be mediocre in today’s competitive market. Though you’re already doing some things many of the Top 100 firms are doing, act now and take the necessary steps to become an employer of choice. Here are a number of benefits the Top 100 Large Firms to Work for are offering:</p><ul><li>Sharing information about how the firm is doing financially</li><li>Paid time off for community service activities or volunteer work</li><li>Invites employees’ immediate families invited to firm events</li><li>Tuition reimbursement</li><li>A formalized succession planning program or practice</li></ul><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm improve talent acquisition and retention, including:</p><p>HR Myths ebook<br/>Winning the War on Talent ebook<br/>The human touch<br/>Finding Happiness and Success at Work</p></div>;
            }
            if(total > 6){
                Result = <div><p>Congratulations! Your firm is the cream of the crop among mid-sized firms.</p><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm continue to be a best firm to work for, including:</p><p>Becoming an Employer of Choice<br/>Keeping pace<br/>Talent – Fixing the talent management disconnect<br/>Take your Talent Strategy Further ebook</p></div>;
            }
        }
        else if(firmSize === 2){
            if(total < 4){
                Result = <div><p>Your firm may be larger in size but that doesn’t necessarily mean it’s mighty. Your firm must make some changes if it’s going to effectively compete in today’s market. Here are a number of places to start.</p><p>Large-size firms that make the Top 100 Best Firms to Work For list are offering employees a range of benefits including:</p><ul><li>Paid time off for community service activities or volunteer work</li><li>Telecommuting options</li><li>Invites employees’ immediate families invited to firm events</li><li>Tuition reimbursement or assistance for additional degrees or credentials</li><li>Matches employee contributions to a retirement savings plans account</li><li>Fitness or wellness programs</li></ul><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm improve talent acquisition and retention, including:</p><p>HR Myths ebook<br/>Winning the War on Talent ebook<br/>The human touch<br/>Finding Happiness and Success at Work</p></div>;
            }
            if(total > 3 && total < 7){
                Result = <div><p>Though you’re already doing some things many of the Top 100 Best Firms to Work For are doing, your firm has room for improvement when it comes to being an employer of choice among large firms.</p><p>Large-size firms that make the Top 100 Best Firms to Work For list are offering employees a range of benefits including but not limited to:</p><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm improve talent acquisition and retention, including:</p><ul><li>Invites employees’ immediate families invited to firm events</li><li>Tuition reimbursement or assistance for additional degrees or credentials</li><li>A formalized succession planning program or practice</li><li>Flexible hours or compressed work weeks</li><li>Personal development or stress management workshops or classes</li><li>Shares information on the firm’s financial health with staff</li></ul><p>HR Myths ebook<br/>Winning the War on Talent ebook<br/>The human touch<br/>Finding Happiness and Success at Work</p></div>;
            }
            if(total > 6){
                Result = <div><p>Congratulations! Your large firm is not only right on track but it’s among the best of the best.</p><p>ADP has a wealth of great resources to help your firm attract and retain top talent. Fill out the form and get resources and tips that will help your firm continue to be a best firm to work for, including:</p><p>Becoming an Employer of Choice<br/>Keeping pace<br/>Talent – Fixing the talent management disconnect<br/>Take your Talent Strategy Further ebook</p></div>;
            }
        }
        
        return(
            <div className="results--text">
                <h3>You answered Yes to {this.props.Total} of {this.props.maxQuestions}</h3>
                {Result}
            </div>
        );
    }
}

export default Results;