import styles from "../../../styles/filterbar.module.css";
import Loader from "../../../ui/Loader";
import Select from "../../../ui/Select";

// project filter
const ProjectFilter = ({
    project,
    setProject,
    projects,
    isLoading,
    handleProjectFetching,
}) => {
    const projectFilter = (data, query) => {
        return _.filter(data, (d) =>
            _.includes(_.lowerCase(d.project_name), _.lowerCase(query))
        );
    };
    return (
        <div>
            <div className={styles.label}>Projects:</div>
            <Select
                value={project}
                onChange={(value) => setProject(value)}
                onClick={handleProjectFetching}
                display={(value) => value?.project_name || "Select All"}
                className={styles.selection_menu}
            >
                <Select.Options>
                    <Select.SearchControllerWrapper>
                        {(query) => {
                            const data = projectFilter(projects, query);
                            return isLoading ? (
                                <div className={`${styles.filterLoader} py-2`}>
                                    <Loader title="Loading..." />
                                </div>
                            ) : _.size(data) === 0 ? (
                                <div className={`${styles.filterLoader} py-2`}>
                                    Data Not Found
                                </div>
                            ) : (
                                _.map(data, (project) => (
                                    <Select.Option
                                        key={project.id}
                                        value={project}
                                    >
                                        {project.project_name}
                                    </Select.Option>
                                ))
                            );
                        }}
                    </Select.SearchControllerWrapper>
                </Select.Options>
            </Select>
        </div>
    );
};

export default ProjectFilter;
