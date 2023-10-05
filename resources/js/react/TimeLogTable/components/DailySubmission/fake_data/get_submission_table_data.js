import { faker } from "@faker-js/faker"
import dayjs from "dayjs"

export default function get_submission_table_data(data_size = 20) {
  const data = [];
  for (let i = 1; i <= data_size; i++) {
    const random_number = faker.number.int({min:1, max:4});
    data.push({
      id: i,
      task_id: random_number,
      employee: faker.person.fullName(),
      report_date: dayjs(faker.date.anytime()).format("MMM DD, YYYY"),
      client: faker.person.fullName(),
      project_manager: faker.person.fullName(),
      lead_developer: faker.person.fullName(),
      project: `demo project - ${i}`,
      task: `demo task - ${random_number*9}`,
      task_status: faker.number.int({min:0, max:1})?'Completed':'Partial',
      task_type: `demo task type - ${random_number*10}`,
      page_type: `demo page type - ${i}`,
      page_link: faker.internet.url(),
      sections: `demo section name`,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et placerat justo. Mauris sollicitudin feugiat mollis. Fusce sed nibh ipsum. Aliquam vulputate sapien vel ligula ultrices viverra. Proin sit amet ante a ligula sodales cursus. Vestibulum sed mauris quam. Nunc bibendum, massa vitae congue pellentesque, massa diam tempus mauris, eu ullamcorper ipsum libero et nisi. In ac est lobortis, laoreet sapien in, aliquet tortor. Donec efficitur, eros eu dignissim varius, arcu urna vulputate est, in imperdiet enim neque a magna. ',
      total_time_spent: `${faker.number.int({ min: 4, max: 5 })} hr ${faker.number.int({min:0, max:59})}`,
      attachment_url: faker.internet.url(),
      site: faker.internet.url(),
      frontend_password: 'password',
      report_submission_date: dayjs(faker.date.anytime()).format("MMM DD, YYYY"),
    });
  }
  return data;
}