import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export default async function handler(req, res) {

    const { data, error } = await supabase
        .from('registro_pressao')
        .select('*')
        .order('data_hora', { ascending: false });

    if (error) {

        return res.status(500).json({
            erro: error.message
        });

    }

    return res.status(200).json(data);

}