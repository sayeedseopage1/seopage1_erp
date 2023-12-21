import _ from "lodash";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";

export default function commentDemoData(count = 10) {
  const commentData = [];

  const getFileUrls = ()=>{
    const files = [];
    for (let i=0;i<faker.number.int({
      min: 1,
      max: 10
    });i++) {
      files.push(`${faker.image.url()}.${faker.system.commonFileExt()}`)
    }
    return files;
  }

  const getData = (i)=>{

    const comment = <p>{faker.lorem.lines(1)} <b>{faker.lorem.words(5)} <small>{faker.lorem.words(3)}</small> {faker.lorem.words(2)}</b> <small>{faker.lorem.words(4)}</small></p>;
    // const comment = <p><h2>Some Format - Text element demo</h2>
    // <h3>heading</h3>
    //   <h1>This is heading 1 - The most importance</h1>
    //   <h2>This is heading 2</h2>
    //   <h3>This is heading 3</h3>
    //   <h4>This is heading 4</h4>
    //   <h5>This is heading 5</h5>
    //   <h6>This is heading 6 - The least importance</h6>
    // <hr />
    // <h3>paragraph</h3>
    // <p>
    //   This paragraph
    //   contains a lot of lines
    //   in the source code,
    //   but the browser 
    //   ignores it.
    // </p>
    
    // <p>
    //   This paragraph
    //   contains      a lot of spaces
    //   in the source     code,
    //   but the    browser 
    //   ignores it.
    // </p>
    
    // <p>
    //   The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.
    // </p>
    // <hr />
    // <h3>em vs i, strong vs b</h3>
    // <p>
    //   The visual result is, by default, the same. <br />
    //   Both tags <em>emphasis</em> and <i>italic</i> render its content in italics. <br />
    //   Both tags <strong>strong emphasis</strong> and <b>bold</b> render its content in bold.
    // </p>
    // <p>
    //   But the semantic meaning is different <br />
    //   The &lt;em&gt; tag represents stress emphasis of its contents, while the &lt;i&gt; tag represents text that is set off from the normal prose. <br />
    //   And similar to &lt;strong&gt; and &lt;b&gt;
    // </p>
    // <hr />
    // <h3>quotes</h3>
    //  <blockquote>
    //    This a long quotations
    //    For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally. 
    //    <br />
    //    <q>can nested some short quote</q>
    // </blockquote> 
    // <q>This is a short quotations</q>
    // <hr />
    // <h3>preformatted</h3>
    //  <p>
    // Text in a p element
    // is displayed in a fixed-width
    // font, and it preserves
    // both      spaces and
    // line breaks
    // </p> 
    // <hr />
    // <h3>abbreviations</h3>
    // <p>
    //   The HTML &lt;abbr&gt; element represents an abbreviation and optionally provides a full description for it. <br />
    //   Demo below <br />
    //   The <abbr title="World Health Organization">WHO</abbr> was founded in 1948. </p>
    // <hr />
    // <h3>address</h3>
    // <p>Demo using &lt;address&gt; tag to display address
    //   <address>
    //     Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br />
    //     Visit us at:<br />
    //     Example.com<br />
    //     Box 564, Disneyland<br />
    //     USA
    //   </address> 
    // <hr />
    // <h3>citation</h3>
    //  <p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p> 
    // <hr /></p></p>;
    // const comment = faker.number.int({ max: 1, min: 0 }) ? faker.lorem.lines({
    //   min: 2,
    //   max: 4,
    // }) : '';
    
    const files = faker.number.int({ max: 1, min: 0 }) || !comment ? getFileUrls() : null;

    // console.log({comment,files});

    return {
      id: 100+i,
      comment,
      files,
      user_id: faker.number.int({min:1,max:3}),
      task_id: faker.number.int(),
      added_by_id: faker.number.int(),
      added_by_name: faker.person.firstName(),
      last_updated_by: faker.number.int(),
      root: null,
      status: null,
      is_deleted: faker.number.int({min:0,max:1}),
      deleted_by: null,
      deleted_at: null,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  for (let i = 0; i < count; i++) {
    commentData.push({
      ...getData(i+1),
      mention_comment: faker.number.int({ max: 1, min:0 })? getData(i) : null,
    })
  }

  return commentData;

  // return _.fill(Array(count),{
  //   ...data,
  //   mention_comment:faker.number.int({max:3,min:1})===2?data:null,
  // })
}