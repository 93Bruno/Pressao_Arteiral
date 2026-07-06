import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export default async function handler(req, res) {

    const { data, error } = await supabase
        .from('registro_pressao')
        .select('id_registro, data_hora, sistolica, diastolica')
        .order('data_hora', { ascending: false });

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    const registros = data.map(registro => {
        const [ano, mes, dia] = registro.data_hora.split('T')[0].split('-');

        return {
            ...registro,
            data_hora: `${dia}/${mes}/${ano}`
        };
    });

    return res.status(200).json(registros);
}