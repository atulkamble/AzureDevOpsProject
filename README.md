# End-to-End Azure DevOps Project Deployment

## Prerequisites

Install Git and Docker on Ubuntu/Linux VM:

```bash
sudo apt update -y
sudo apt install git docker.io -y

git config --global user.name "Atul Kamble"
git config --global user.email "atul_kamble@hotmail.com"

sudo systemctl start docker
sudo systemctl enable docker
```

---

# 1. Development Stage

## Flask Application Repository

Repository:
[AzureDevOpsProject GitHub Repository](https://github.com/atulkamble/AzureDevOpsProject?utm_source=chatgpt.com)

---

## Clone Repository

```bash
git clone https://github.com/atulkamble/AzureDevOpsProject.git

cd AzureDevOpsProject
```

---

## Create Development Branch

```bash
git branch dev
git checkout dev
```

---

## Push Code to Development Branch

```bash
git add .
git commit -m "code"
git push origin dev
```

---

## GitHub Authentication

Use GitHub Personal Access Token (PAT) while pushing code.

Generate Token:

[GitHub Personal Access Tokens](https://github.com/settings/tokens?utm_source=chatgpt.com)

---

# 2. Staging Stage (Docker)

## Create Dockerfile

Example Dockerfile:

```dockerfile
FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
```

---

## Build Docker Image

### Mac M-Series / ARM Systems

```bash
docker buildx build \
--platform linux/arm64/v8 \
-t docker.io/atuljkamble/azuredevopsproject:dev \
--load .
```

---

### Linux / Azure VM

```bash
docker build -t docker.io/atuljkamble/azuredevopsproject:dev .
```

---

## Run Container

```bash
docker run -d -p 5000:5000 atuljkamble/azuredevopsproject:dev
```

---

## Verify Running Containers

```bash
docker ps
docker images
```

---

## Push Docker Image to DockerHub

```bash
docker push docker.io/atuljkamble/azuredevopsproject:dev
```

DockerHub Profile:

[DockerHub - atuljkamble](https://hub.docker.com/u/atuljkamble?utm_source=chatgpt.com)

---

# 3. AKS Cluster Creation Phase

## Verify Azure CLI

```bash
az version
```

Azure CLI Installation:

[Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?utm_source=chatgpt.com)

---

## Login to Azure

```bash
az login
```

---

## Create Resource Group

```bash
az group create \
  --name devops \
  --location centralindia
```

---

# 4. Create Azure Kubernetes Service (AKS) Cluster

## Create AKS Cluster

```bash
az aks create \
  --resource-group devops \
  --name mycluster \
  --node-count 2 \
  --node-vm-size standard_a2_v2 \
  --enable-managed-identity \
  --enable-addons monitoring \
  --generate-ssh-keys
```

---

## Configure Kubernetes Context

### Set Azure Subscription

```bash
az account set \
--subscription 08b7b8d4-af42-4972-9517-11ea256ea068
```

---

### Download AKS Credentials

```bash
az aks get-credentials \
--resource-group devops \
--name mycluster \
--overwrite-existing
```

---

## Verify Cluster Nodes

```bash
kubectl get nodes
```

---

# 5. Kubernetes Deployment Phase

## Navigate to Kubernetes Manifest Directory

```bash
cd k8s
```

---

## Deploy Application

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

---

## Verify Pods

```bash
kubectl get pods
```

---

## Describe Pod

```bash
kubectl describe pod <pod-id>
```

Example:

```bash
kubectl describe pod azuredevopsapp-67f89d8b7f-x2abc
```

---

## Verify Services

```bash
kubectl get svc
```

---

## Access Application

Copy the `EXTERNAL-IP` from:

```bash
kubectl get svc
```

Open in browser:

```bash
http://EXTERNAL-IP
```

---

# 6. Branching Strategy

Maintain separate branches for each environment.

---

## Git Workflow

```bash
git checkout branch-name

git add .
git commit -m "env"

git push origin branch-name
```

---

# 7. Environment Flow

```text
Development  →  Staging  →  Production
```

---

# 8. Docker Image Tagging Strategy

## Development

```bash
docker build -t docker.io/atuljkamble/azuredevopsproject:dev .
```

---

## Staging

```bash
docker build -t docker.io/atuljkamble/azuredevopsproject:staging .
```

---

## Production

```bash
docker build -t docker.io/atuljkamble/azuredevopsproject:prod .
```

---

# 9. Recommended Repository Structure

```text
AzureDevOpsProject/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── README.md
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
├── .github/
│   └── workflows/
│       └── ci-cd.yaml
│
└── templates/
```

---

# 10. Important DevOps Commands

## Kubernetes

```bash
kubectl get all
kubectl logs pod-name
kubectl delete pod pod-name
kubectl rollout restart deployment azuredevopsapp
```

---

## Docker

```bash
docker ps
docker images
docker logs container-id
docker rm -f container-id
```

---

# 11. Architecture Flow

```text
Developer
   ↓
GitHub Repository
   ↓
Docker Build
   ↓
DockerHub Registry
   ↓
Azure Kubernetes Service (AKS)
   ↓
Kubernetes Service (LoadBalancer)
   ↓
End Users
```
