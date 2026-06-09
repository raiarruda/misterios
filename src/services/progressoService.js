import { supabase } from "./supabase";

export async function registrarDescoberta(codigo) {
  const { error } = await supabase.from("progresso").upsert({
    codigo,
  });

  if (error) {
    console.error(error);
  }
}

export async function concluirMisterio(codigo) {
  const { error } = await supabase
    .from("progresso")
    .update({
      status: "CONCLUIDO",
      concluido_em: new Date().toISOString(),
    })
    .eq("codigo", codigo);

  if (error) {
    console.error(error);

    return false;
  }

  return true;
}

export async function verificarConclusao(codigo) {
  const { data, error } = await supabase
    .from("progresso")
    .select("status") // Agora buscamos a coluna 'status'
    .eq("codigo", codigo)
    .single();

  if (error) {
    if (error.code === "PGRST116") return false; // Sem registro = não concluído
    console.error("Erro ao verificar conclusão:", error);
    return false;
  }

  // Retorna true apenas se o status for estritamente 'CONCLUIDO'
  return data?.status === "CONCLUIDO";
}

export async function obterTodosProgressos() {
  const { data, error } = await supabase.from("progresso").select("*");

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function obterProgressoPorCodigo(codigo) {
  const { data, error } = await supabase
    .from("progresso")
    .select("*")
    .eq("codigo", codigo)
    .maybeSingle();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
