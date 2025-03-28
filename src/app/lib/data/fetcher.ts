const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function buildUrl(url: string): string {
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function get<T = unknown>(url: string): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: "GET",
  });
  if (!res.ok) throw new Error("GET 실패");
  return res.json();
}

export async function post<T = unknown, B = unknown>(
  url: string,
  body: B
): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("POST 실패");
  return res.json();
}

export async function put<T = unknown, B = unknown>(
  url: string,
  body: B
): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("PUT 실패");
  return res.json();
}

export async function patch<T = unknown, B = unknown>(
  url: string,
  body: B
): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("PATCH 실패");
  return res.json();
}

export async function del<T = unknown>(url: string): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("DELETE 실패");
  return res.json();
}
