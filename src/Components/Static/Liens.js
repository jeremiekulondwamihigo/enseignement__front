module.exports = {

    lien_read: "http://localhost:8080/bulletin/read",
    lien_create: "http://localhost:8080/bulletin/create",
    lien_delete: "http://localhost:8080/bulletin/delete",
    lien_update: "http://localhost:8080/bulletin/update",

    lien_image_admin: "http://localhost:8080/imgagent",
    lien_image_eleve: "image_eleve",

    isEmpty: function (value) {
        return(value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0))
    },
    difference: (a) => {
        const b = new Date().toISOString().split("T")[0]
        const date1 = new Date(a);
        const date2 = new Date(b);
        const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        let day = 1000 * 60 * 60 * 24;
        const total = (date2utc - date1utc) / day
        return(parseInt(total / 366))
    }

}
