import { faker } from "@faker-js/faker"

export const get_data_dailySubmission = () =>{
    const dataArr = [];
    const detailsArr = [];

    const date = faker.number.int({ min: 20, max: 30 });

    for (let i = 0; i < 10; i++) {

        detailsArr.push({
            id:`details_${i}`,
            report_date: `Aug ${date},2023`,
            page_link: faker.internet.url(),
            sections: 'Slider, Navigation Menu',
            comment: faker.lorem.words(30),
            total_time_spent: `${faker.number.int({ min: 1, max: 3 })} hours ${faker.number.int({ min: 1, max: 59 })} minutes`,
            attachment_url: faker.image.urlLoremFlickr({ category: 'nature' }),
            site_url: faker.internet.url(),
            frontend_password: faker.internet.password({ length: 8 }),
            submission_date: `Aug ${date+1},2023`
        });
    }

    for (let i = 0; i < 10; i++) {
        dataArr.push({
            id: `data_${i}`,
            submission: `Daily report submitted by ${faker.person.fullName({sex:"male" | "female"})}`,
            report_date: `Aug ${date},2023`,
            details : detailsArr,
        });
    }

    return dataArr;
};