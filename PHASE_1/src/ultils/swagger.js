import swaggerJsDoc from "swagger-jsdoc";

const swaggerDoc = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GeeksForHDs",
            version: "1.0.0",
            contact: {
                name: "Sam",
                email: "tingzhuangzhou@gmail.com",
            },
            description:
                "Open API standard swagger document for Devils CRM System",
        },
        servers: [
            {
                url: "https://news-website-seng.herokuapp.com/",
                description: "Deployed server",
            },
            {
                url: "http://localhost:4000/",
                description: "development server",
            }
        ],
    },
    apis: ["src/controllers/*.js"],
});

export default swaggerDoc;
