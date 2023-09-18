import {faker} from '@faker-js/faker'


export const fakeData = (limit) => {
    const generateData = () => ({
        id: faker.number.int(), 
        project_manager: {
            id: faker.number.int(), 
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
        },
        client: {
            id: faker.number.int(), 
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
        },
        number_of_project: faker.string.numeric(2),
        total_project_value: faker.finance.amount(),
        number_of_tasks: faker.string.numeric(3),
        total_number_of_revision: faker.string.numeric(2),
        hours_spent_in_revision: faker.string.numeric(3) + ' hours', 
        sales_issues: faker.string.numeric(2),
        client_side_issues: faker.string.numeric(2),
        project_manager_issues: faker.string.numeric(2),
        lead_developer_issues: faker.string.numeric(2),
        developer_issues: faker.string.numeric(2),
        total_disputes: faker.string.numeric(2),
        unsolved_dispute: faker.string.numeric(2),
        created_at: faker.date.anytime()
    })

    let data = [];
    for(let i = 0; i < limit ; i++){
        data.push(generateData());
    } 

    return data;
}

const cookData = () => { 
    let n = Number(faker.string.numeric(1));
    const id = Number(faker.string.numeric(4));
    const project_manager = {
        id: Number(faker.string.numeric(3)),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
    };
    
    const hours_spent_in_revision = faker.string.numeric(3) + ' hours'; 
    const total_project_value= faker.finance.amount();
    const number_of_project= faker.string.numeric(2);  
    const number_of_tasks = faker.string.numeric(3); 
    const client = {
        id: faker.number.int(), 
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
    };

    let row = [];
    
    for(let i = 1; i < n ; i++){
        row.push({
            id,
            project_manager,
            client,
            task: {
                id: Number(faker.string.numeric(3)),
                name: faker.lorem.sentence({ min: 2, max: 3 }),
                total_number_of_revision: faker.string.numeric(2),
            },
            hours_spent_in_revision,
            total_project_value,
            number_of_project, 
            number_of_tasks, 
            sales_issues: faker.string.numeric(2),
            client_side_issues: faker.string.numeric(2),
            project_manager_issues: faker.string.numeric(2),
            lead_developer_issues: faker.string.numeric(2),
            developer_issues: faker.string.numeric(2),
            total_disputes: faker.string.numeric(2),
            unsolved_dispute: faker.string.numeric(2),
            created_at: faker.date.anytime(),
            revision_request_raised_by: {
                id: faker.number.int(), 
                name: faker.person.fullName(),
                avatar: faker.image.avatar(),
            },
            reason_for_revision: faker.lorem.sentence({ min: 2, max: 5 }),
            disputed: faker.datatype.boolean(),
            total_comments: faker.string.numeric(2),
            verdict: faker.lorem.sentence({ min: 2, max: 5 })
        })
    }

    return row;
}

export const projectElaborationData = (l) => {
    let data = [];
    for(let i = 0; i < l; i++){
        let d = cookData();
        data = [...data, ...d];
    } 

    return data;
}
 