import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';


export const taskReportTableData = (dataLength = 20) =>{
  const dataArr = [];

  for(let i=0; i<dataLength; i++){
    dataArr.push({
      report_no : faker.string.uuid(),
      report_date: dayjs(faker.date.anytime()).format('DD-MMM-YYYY'),
      resolve_on: faker.number.int({ min: 0, max: 1 })?dayjs(faker.date.anytime()).format('DD-MMM-YYYY'):'Not Resolved Yet',
      client: faker.person.fullName(),
      project: "Build me a website",
      task: "Home page design and development",
      report_issuer: faker.person.fullName(),
      accountable_individual: faker.number.int({ min: 0, max: 1 })?"Lead Developer":"Project Manager",
      report_task_name: "Home page redesign",
      report_reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus nulla quis cursus cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer velit ante, pellentesque quis suscipit nec, sagittis quis nibh. Nam eleifend eget tellus et porta. Ut commodo, magna a vehicula vestibulum, nisl sem fermentum augue, at lobortis ex libero vitae odio. Cras tristique magna libero. Aliquam sagittis luctus erat, laoreet cursus neque faucibus ullamcorper. Fusce et suscipit nisl. ",
      report_reason_details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus nulla quis cursus cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer velit ante, pellentesque quis suscipit nec, sagittis quis nibh. Nam eleifend eget tellus et porta. Ut commodo, magna a vehicula vestibulum, nisl sem fermentum augue, at lobortis ex libero vitae odio. Cras tristique magna libero. Aliquam sagittis luctus erat, laoreet cursus neque faucibus ullamcorper. Fusce et suscipit nisl. ",
      previously_reported: faker.number.int({ min: 0, max: 1 })?"Yes":"No",
    })
  }
  return [...dataArr];
}