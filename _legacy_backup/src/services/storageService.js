import Dexie from 'dexie';

export const db = new Dexie('HomeVisionDB');

db.version(1).stores({
    projects: '++id, name, lastModified',
    furniture: '++id, projectId, itemId, name, x, y, rotation',
    walls: '++id, projectId, startX, startY, endX, endY',
    openings: '++id, projectId, wallId, type, position' // position as 0-1 along wall
});

export const saveProject = async (name, projectData) => {
    const projectId = await db.projects.add({
        name,
        lastModified: new Date()
    });

    // Save structural elements
    if (projectData.walls) {
        await Promise.all(projectData.walls.map(w => db.walls.add({
            projectId,
            startX: w.start.x,
            startY: w.start.y,
            endX: w.end.x,
            endY: w.end.y
        })));
    }

    return projectId;
};

export const getProjects = async () => {
    return await db.projects.toArray();
};
