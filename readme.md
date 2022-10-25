## usernames and passwords are in the json file inside the data folder

## Hiring Manager Route
- Post/jobs
https://job-portal-iyf7.onrender.com/api/v1/jobs/

use the following format as per schema.
Make sure hiring manager Id is provided
{
        "name": "JS Developer",
        "description": "JS Developer 1",
        "email": "info@web-hr.com",
        "hiringManager": {
            "id": "6357a017c2545e4a609cfd2f"
        },
        "location": "Khulna",
        "jobType": "remote",
        "salary": 25000
}

- Get manager/jobs
https://job-portal-iyf7.onrender.com/api/v1/manager/jobs/

make sure token is provided

- Get manager/jobs/:id
make sure token is provided

https://job-portal-iyf7.onrender.com/api/v1/manager/jobs/6357a4d83a8b5cc6a1502009

- Patch /jobs/:id

make sure you are logged in and provide a token
https://job-portal-iyf7.onrender.com/api/v1/jobs/6357aaf306798e063e4fcb54


## Candidate Routes

- Get /jobs
https://job-portal-iyf7.onrender.com/api/v1/jobs/
can be filtered and sorted

- Get /jobs/:id
make sure token is provided.
https://job-portal-iyf7.onrender.com/api/v1/jobs/6357a4833a8b5cc6a1501ffc

- Post /jobs/:id
make sure token is provided.
https://job-portal-iyf7.onrender.com/api/v1/jobs/ID

Candidate is not able to apply multiple times for one job. 
candidate can upload resume on: https://job-portal-iyf7.onrender.com/api/v1/jobs/6356eb4c0ecc51a3b8d3f0f7/apply



## Auth Routes

- Post /user/signup

https://job-portal-iyf7.onrender.com/api/v1/user/signup

- Post /user/login

https://job-portal-iyf7.onrender.com/api/v1/user/login

- Get /user/me
make sure to provide token
https://job-portal-iyf7.onrender.com/api/v1/user/me