// eslint-disable-next-line @typescript-eslint/no-var-requires
const scanner = require("sonarqube-scanner");

scanner(
    {
        serverUrl: "http://localhost:9000",
        login: "admin",
        password: "admin3",
        options: {
            "sonar.login": "admin",
            "sonar.password": "12345678",
            "sonar.sources": "./resources/js/react/modules/Pm-Sales/Points",
            "sonar.projectKey": "Pm-Sales-Points",
            "sonar.exclusions": "**/node_modules/**,**/dist/**",
        },
    },
    () => process.exit()
);
