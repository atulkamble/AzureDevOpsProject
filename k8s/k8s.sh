az aks create \
  --resource-group devops \
  --name mycluster \
  --node-count 2 \
  --node-vm-size standard_a2_v2 \
  --enable-managed-identity \
  --enable-addons monitoring \
  --generate-ssh-keys
