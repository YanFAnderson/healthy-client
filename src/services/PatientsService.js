import http from "./Http";

class PatientsService {
    findAll() {
        return http.get("/patient")
    }

    create(data) {
        return http.post("/patient", data)
    }

    update(data) {
        return http.put("/patient", data)
    }

    delete(id) {
        return http.delete("/patient", {params: {id: id}})
    }

    search(data) {
        return http.get('/search', {params: data})
    }

}

export default new PatientsService();
