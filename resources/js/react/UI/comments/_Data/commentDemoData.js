import _ from "lodash";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";

export default function commentDemoData(count = 10) {
  const commentData = [];

  const getData = (i)=>{

    const comment = faker.number.int({ max: 1, min: 0 }) ? faker.lorem.lines({
      min: 2,
      max: 4,
    }) : ''
    
    const files = faker.number.int({ max: 1, min: 0 }) || !comment ? _.fill(Array(faker.number.int({
      min: 1,
      max: 10
    })), faker.image.url()) : null;

    // console.log({comment,files});

    return {
      id: i,
      comment,
      files,
      user_id: faker.number.int(),
      task_id: faker.number.int(),
      added_by_id: faker.number.int(),
      added_by_name: faker.person.firstName(),
      last_updated_by: faker.number.int(),
      root: null,
      status: null,
      is_deleted: 0,
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