import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const projectURL = process.env.SUPABASE_PORJECT_URL;
const projectKey = process.env.SUPABASE_PORJECT_KEY;

export const supabase = createClient(projectURL, projectKey);