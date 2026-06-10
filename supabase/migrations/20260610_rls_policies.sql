-- ============================================================
-- AEWA Website — RLS Policies & Table Setup
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. site_content ────────────────────────────────────────
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can read all content
CREATE POLICY "site_content_anon_select"
  ON public.site_content FOR SELECT
  TO anon
  USING (true);

-- Authenticated (admin) has full access
CREATE POLICY "site_content_auth_all"
  ON public.site_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ── 2. testimonials ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote       text NOT NULL,
  author      text NOT NULL,
  role        text NOT NULL,
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read active testimonials
CREATE POLICY "testimonials_anon_select"
  ON public.testimonials FOR SELECT
  TO anon
  USING (active = true);

-- Authenticated (admin) has full access
CREATE POLICY "testimonials_auth_all"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ── 3. client_logos ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.client_logos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  file_url      text NOT NULL,
  active        boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Public can read active logos
CREATE POLICY "client_logos_anon_select"
  ON public.client_logos FOR SELECT
  TO anon
  USING (active = true);

-- Authenticated (admin) has full access
CREATE POLICY "client_logos_auth_all"
  ON public.client_logos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ── 4. Storage: client-logos bucket ────────────────────────
-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-logos', 'client-logos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public can view files in the bucket
CREATE POLICY "client_logos_storage_public_read"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'client-logos');

-- Authenticated (admin) can upload/delete files
CREATE POLICY "client_logos_storage_auth_write"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'client-logos');

CREATE POLICY "client_logos_storage_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'client-logos');


-- ── 5. Seed existing client logos (if table is empty) ──────
INSERT INTO public.client_logos (name, file_url, active, display_order)
SELECT name, file_url, true, row_number() OVER (ORDER BY name) - 1
FROM (VALUES
  ('Bollore',           '/images/Client logos/Bollore.png'),
  ('Bouygues',          '/images/Client logos/Bouygues.png'),
  ('Brass LNG',         '/images/Client logos/Brass LNG.jpg'),
  ('Cainergy',          '/images/Client logos/Cainergy.png'),
  ('Chevron',           '/images/Client logos/Chevron.jpg'),
  ('CPL',               '/images/Client logos/CPL_Logo_Web.jpg.webp'),
  ('Danone',            '/images/Client logos/Danone.png'),
  ('Euro Tech',         '/images/Client logos/Euro Tech.png'),
  ('ExxonMobil',        '/images/Client logos/ExxonMobil-Logo.wine.png'),
  ('First E&P',         '/images/Client logos/First E and P.png'),
  ('Fugro',             '/images/Client logos/Logo_Fugro_Colour_RGB.jpg'),
  ('Heliconia',         '/images/Client logos/Heliconia.png'),
  ('IPAS',              '/images/Client logos/logo_Ipas.jpg'),
  ('LafargeHolcim',     '/images/Client logos/Lafarge-Holcim.jpg.webp'),
  ('ND Western',        '/images/Client logos/ND western.png'),
  ('Niger Dock',        '/images/Client logos/nigerdock.png'),
  ('Nigeria LNG',       '/images/Client logos/LNG.jpg'),
  ('NLNG',              '/images/Client logos/NLNG.jpg'),
  ('NOV',               '/images/Client logos/NOV.png'),
  ('Nestle',            '/images/Client logos/Nestle.png'),
  ('OPAC Refineries',   '/images/Client logos/Opac.png'),
  ('Prodeco',           '/images/Client logos/Prodeco.png'),
  ('Saipem',            '/images/Client logos/Saipem.png'),
  ('Schneider Electric','/images/Client logos/Schneider Electric.png'),
  ('Shell',             '/images/Client logos/shell.png'),
  ('Siemens',           '/images/Client logos/SIEMENS.png'),
  ('TotalEnergies',     '/images/Client logos/Total-energies.gif')
) AS t(name, file_url)
WHERE NOT EXISTS (SELECT 1 FROM public.client_logos LIMIT 1);
