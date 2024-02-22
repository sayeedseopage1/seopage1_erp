import React from "react";

export default function GuideLineText({ task }) {
    const leadDeveloperText = `<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c4{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c0{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c5{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c2{height:11pt}.c3{font-style:italic}.c1{font-weight:700}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c5 doc-content"><p class="c0"><span>Other than all the old fields, we have introduced the task type and page type fields in the new subtask creation form. Here is a guide for you so you know when to choose which one: <br><br></span><span class="c1">1. New page design:</span><span>&nbsp;When you are going to need any new pages developed (except for cloning for example duplicating a service page to create 20 more service pages and cases like this), you should select this one. It has 2 subdivisions in the next field: <br><br></span><span class="c1">A. Primary page development:</span><span class="c4">&nbsp;All the pages on the website that are money pages (can generate money or revenue), require significant effort to be developed and clients usually remain very picky about them and don&rsquo;t want to compromise anything in those pages are what we are calling primary pages. Primary pages will have these elements mandatorily: <br> &nbsp; &nbsp; They have to be money pages like home, product, service, collection etc. </span></p><p class="c0"><span class="c4">&nbsp; &nbsp; &nbsp;*Most of the traffic will be on these pages <br> &nbsp; &nbsp; They have not less than 6 sections and every section has to be well designed<br> &nbsp; &nbsp; Homepage should be always counted as a primary page. <br> &nbsp; &nbsp; The developers will have to put significant effort to build them</span></p><p class="c0"><span>&nbsp; &nbsp; &nbsp;*The clients will be serious/picky about these pages and won&#39;t accept unless they are perfect. <br><br></span><span class="c1">Rough numbers of primary page on a website:</span><span>&nbsp;Not more than 3 (Except for very rare cases)<br><br></span><span class="c1">Example:</span><span>&nbsp;Home, product page and collection pages for woocommerce/shopify; home, service category and service page for service websites; Home, property buy/sale listing pages for a real estate broker site and like this. <br><br><br>B. </span><span class="c1">Secondary page development:</span><span class="c4">&nbsp;All the relatively less important pages on the site should go to secondary pages. The characteristics include: <br> &nbsp;*They don&rsquo;t generate money necessarily, they are needed for customers&#39; trust, information and other things. For example, about us, shipping policy, FAQ, return policy etc. <br> &nbsp;*They have less than 6 sections, for example contact us. <br> &nbsp;*Require less efforts from the developers to develop them.<br> &nbsp;*In many cases, developers can directly use the template with minimum customization. For example, cart, checkout pages on ecommerce sites. </span></p><p class="c0"><span>&nbsp; *The clients will be less serious about them as these pages are not super sensitive. <br><br><br>2. </span><span class="c1">Cloning existing design: <br></span><span class="c4">Any cloning/duplication job that needs to be done in bulk should go under this. Example include: <br><br>A. Creating 20 service pages from 1 service page just by changing the content and the picture. <br>B. Creating/uploading 300 products after the product page will be developed initially. </span></p><p class="c0"><span class="c4">C. Creating 70 location pages from 1 page template finalized initially. <br><br>These tasks can be assigned to junior most persons in the team as these are identical to data entry works. <br><br></span></p><p class="c0"><span>3. </span><span class="c1">Others: </span><span><br>Under others, there are some other work types which you can select depending on your needs. <br><br>Choosing any task as the primary task will require authorization from team lead/management and the task will be assigned to the developers after the authorization part will be done. Declare any page as a primary page carefully as we are going to set up a point system for the developers where developers will get more points for the primary pages when compared to the secondary pages. So declaring any page as a primary page when it will take almost no effort to create can give the respective developer an unfair edge over the rest of him team members. <br><br></span><span class="c1">P.S. </span><span class="c1 c3">Other than these, we have added a new field named page url in the subtask creation form. So from now, you have to define the urls where the developers will work when assigning a task. It&rsquo;s important that the developers don&#39;t choose urls/permalinks randomly and you declare them beforehand and they use them mandatorily. <br><br></span><span class="c1">Naming Criteria<br></span><span class="c4">Make sure the subtask names are self explanatory so you or anyone else from the management knows what the subtask was about from its name. <br><br>For example, if the task name is &ldquo;Homepage&rdquo;, and if you have to break it into parts for obvious reasons, the subtask names should be as below: <br>Homepage mockup design (XD)</span></p><p class="c0"><span class="c4">Creating a custom slider for the homepage</span></p><p class="c0"><span class="c4">Converting XD to wordpress for the homepage</span></p><p class="c0 c2"><span class="c4"></span></p><p class="c0 c2"><span><br><br><br></span></p></body></html>`;

    const leadDesignerText = `<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c3{padding-top:0pt;padding-bottom:0pt;line-height:1.0;orphans:2;widows:2;text-align:left}.c5{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c4{height:11pt}.c0{font-weight:700}.c2{font-style:italic}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c5 doc-content"><p class="c3"><span> Other than all the old fields, we have introduced the task type and page type fields in the new subtask creation form. Here is a guide for you so you know when to choose which one:<br><br></span><span class="c0">1. New Page Design:</span><span>&nbsp;When you are going to need any new pages designed (except for cloning for example, duplicating a service page to create 20 more service pages and cases like this), you should select this one. It has 2 subdivisions in the next field:<br><br></span><span class="c0">A. Primary Page Design:</span><span class="c1">&nbsp;All the pages on the website that are money pages (can generate money or revenue), require significant effort to be designed and clients usually remain very picky about them and don&rsquo;t want to compromise anything in those pages are what we are calling primary pages. You can consider a page as a &ldquo;Primary Page Design&rdquo; based on the following criteria: </span></p><p class="c3 c4"><span class="c1"></span></p><p class="c3"><span>* The homepage should consistently be counted as the primary page. In the absence of specific requirements regarding the homepage, the initial page that the designer is tasked with designing will be considered the </span><span class="c0">&quot;Primary Page Design&quot;</span><span>. This applies to other significant money pages such as the product page, services page, collection page, etc.</span><span class="c0"><br></span><span><br></span><span class="c0">Rough numbers of the primary pages on a website:</span><span>&nbsp;Not more than 3 (Except for very rare cases)<br><br></span><span class="c0">Example:</span><span>&nbsp;Home, product page and collection pages for woocommerce/shopify; home, service category and service page for service websites; Home, property buy/sale listing pages for a real estate broker site and like this.<br><br><br>B.&nbsp;</span><span class="c0">Secondary Page Design:</span><span>&nbsp;Anything except the primary page design should be counted as the &ldquo;</span><span class="c0">Secondary Page Design</span><span>&rdquo;<br><br><br>2.&nbsp;</span><span class="c0">Cloning existing design:<br></span><span class="c1">Any cloning/duplication job that needs to be done in bulk should go under this. Examples include:<br><br>A. Designing 20 service pages from 1 service page just by changing the content and the picture.<br>B. Designing 300 products after the product page will be designed initially.</span></p><p class="c3"><span class="c1">C. Designing 70 location pages from 1 page template finalized initially.<br><br>These tasks can be assigned to most junior persons in the team as these are identical to data entry work.<br><br></span></p><p class="c3"><span>3.&nbsp;</span><span class="c0">Others:</span><span><br>Under others, there are some other work types that you can select depending on your needs.<br><br>Choosing any task as the primary task will require authorization from the team lead/management and the task will be assigned to the designers after the authorization part will be done. Declare any page as a primary page carefully as we are going to set up a point system for the designers where designers will get more points for the primary pages when compared to the secondary pages. So declaring any page as a primary page when it will take almost no effort to create can give the respective designer an unfair edge over the rest of his team members.<br><br></span><span class="c0">P.S.&nbsp;</span><span class="c0 c2">Other than these, we have added a new field named page url in the subtask creation form. So from now, you have to define the urls where the developers will work when assigning a task. It&rsquo;s important that the designers don&#39;t choose urls/permalinks randomly and you declare them beforehand and they use them mandatorily.<br><br></span><span class="c0">Naming Criteria<br></span><span class="c1">Make sure the subtask names are self explanatory so you or anyone else from the management knows what the subtask was about from its name.<br><br>For example, if the task name is &ldquo;Homepage&rdquo;, and if you have to break it into parts for obvious reasons, the subtask names should be as below:<br>Homepage mockup design (XD)</span></p><p class="c3"><span class="c1">Creating a custom slider for the homepage</span></p><p class="c3"><span class="c1">Converting XD to WordPress for the homepage</span></p></body></html>`;

    const isDesignerTask = _.includes([5, 7], task?.category?.id);

    console.log({ isDesignerTask, task });

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: isDesignerTask ? leadDesignerText : leadDeveloperText,
            }}
        />
    );
}
