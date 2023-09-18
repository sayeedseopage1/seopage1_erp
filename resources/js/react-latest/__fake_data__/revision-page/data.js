import {faker} from '@faker-js/faker'


const person = () => ({
    id: Number(faker.string.numeric(3)),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
});

const status = ['pending', 'accepted', 'denied'];

export const getRevisionTableData = (limit = 10) => {
    const arr = [];
    for(let i = 0; i < limit; i++){
        arr.push({
            id: faker.string.numeric(3), 
            project: {
                id: Number(faker.string.numeric(3)),
                name: faker.lorem.sentence({ min: 3, max: 5 }),
            },
            client: person(),
            task: {
                id: Number(faker.string.numeric(3)),
                name: faker.lorem.sentence({ min: 3, max: 5 }),
            },
            authorized_by: person(),
            revision: faker.lorem.sentence({ min: 20, max: 40 }),
            revision_reason: faker.lorem.sentence({ min: 10, max: 20 }),
            revision_provided_by: person(),
            revision_for: person(),
            revision_due_to: person(),
            project_manager: person(),
            lead_developer: person(),
            sales_executive: person(),
            status: status[_.random(0,2)],
        })
    }

    return arr;
}