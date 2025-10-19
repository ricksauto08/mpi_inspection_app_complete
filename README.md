# MPI Inspection App (Dockerized)

## Installation (PowerShell + Docker)
```powershell
git clone https://github.com/youruser/mpi_inspection_app_complete.git
cd mpi_inspection_app_complete
docker build -t mpi-dashboard .
docker run -d -p 80:3000 --name mpi_dashboard mpi-dashboard
```

Access the form at http://localhost/form.html
View the dashboard at http://localhost/index.html
