import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export default async function handler(req, res) {

    const { data, error } = await supabase
        .from('registro_pressao')
        .select('dia:id_registro, data_hora, sistolica, diastolica')
        .order('data_hora', { ascending: false });

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    const registros = data.map(registro => ({
        ...registro,
        data_hora: new Date(registro.data_hora).toLocaleDateString('pt-BR')
    }));

    return res.status(200).json(registros);

}