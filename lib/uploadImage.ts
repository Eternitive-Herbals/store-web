export async function uploadImage(file: File) {
  const res = await fetch("/api/s3-upload", {
    method: "POST",
    body: JSON.stringify({ fileType: file.type }),
  });

  const { signedUrl, fileUrl } = await res.json();

  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  return fileUrl;
}

export async function deleteImage(fileUrl: string) {
  const res = await fetch("/api/s3-upload", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }

  return await res.json();
}
