<?php
/**
 * Plugin Name: ODISSEO — Integrazione GRC Lab
 * Description: Aggiunge una sezione dimostrativa ODISSEO sotto TITANIUM nel Lab, senza modificare il plugin TITANIUM né la pagina WordPress.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: MIT
 * Text Domain: mm-odisseo-lab
 */
if (!defined('ABSPATH')) { exit; }

/** Assets localizzati: caricati soltanto nella pagina Lab già esistente. */
function mm_od_lab_enqueue_assets() {
    if (!is_page('lab')) { return; }
    $post = get_queried_object();
    if (!$post instanceof WP_Post || !has_shortcode($post->post_content, 'mm_grc_lab')) { return; }
    wp_enqueue_style('mm-odisseo-lab-integrated', plugins_url('assets/integration.css', __FILE__), array(), '1.0.0');
    wp_enqueue_script('mm-odisseo-lab-integrated', plugins_url('assets/launcher.js', __FILE__), array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'mm_od_lab_enqueue_assets', 120);

/**
 * L'output TITANIUM originale viene restituito *intatto*, preceduto da una piccola
 * navigazione di scelta e seguito dall'area ODISSEO: nessun override di shortcode.
 */
function mm_od_lab_append_after_titanium($output, $tag, $attr, $m) {
    if ($tag !== 'mm_grc_lab' || !is_page('lab')) { return $output; }
    static $already_added = false;
    if ($already_added) { return $output; }
    $already_added = true;
    $app_url = add_query_arg('ver', '1.0.0', plugins_url('app/index.html', __FILE__));
    ob_start(); ?>
    <nav class="mm-od-selector" aria-label="Scegli il laboratorio dimostrativo">
      <span class="mm-od-selector-label">Esplora gli applicativi</span>
      <a href="#titanium" class="mm-od-selector-link">TITANIUM <small>GRC &amp; audit</small></a>
      <a href="#odisseo" class="mm-od-selector-link mm-od-selector-link-accent" data-mm-od-select>ODISSEO <small>Sopralluoghi e NC</small></a>
    </nav>
    <?php $chooser = ob_get_clean();
    ob_start(); ?>
    <section id="odisseo" class="mm-odisseo-lab" data-mm-odisseo aria-labelledby="mm-od-lab-title">
      <div class="mm-od-header">
        <div>
          <p class="mm-od-kicker">02 / Applicativo dimostrativo indipendente</p>
          <h2 id="mm-od-lab-title">ODISSEO <span>Inspection &amp; Non-Conformity Management</span></h2>
          <p class="mm-od-intro">Dal sopralluogo all'azione correttiva. Pianifica una visita, compila la checklist della struttura e segui le non conformità fino alla risoluzione e all'archiviazione.</p>
          <div class="mm-od-chips" aria-label="Funzioni disponibili"><span>4 modelli · 121 controlli</span><span>NC e pianificazioni</span><span>Report ed export</span></div>
          <p class="mm-od-disclaimer">Dimostrazione indipendente di un sistema di gestione dei sopralluoghi e delle non conformità. Dati sintetici; nessun collegamento a sistemi operativi reali.</p>
        </div>
        <div class="mm-od-symbol" aria-hidden="true"><span>OD</span><i></i><i></i><i></i></div>
      </div>
      <div class="mm-od-workspace" data-mm-od-workspace>
        <div class="mm-od-launcher" data-mm-od-launcher>
          <strong>Metti alla prova un ciclo ispettivo completo</strong>
          <p>Avvia la demo guidata con strutture e incarichi inventati, oppure comincia con una sessione vuota. Le modifiche restano in memoria; scarica il file JSON prima di chiudere.</p>
          <div class="mm-od-actions"><button type="button" class="mm-od-button" data-mm-od-launch>Avvia ODISSEO <span aria-hidden="true">→</span></button><a class="mm-od-open" href="<?php echo esc_url($app_url); ?>" target="_blank" rel="noopener noreferrer">Apri in una scheda ↗</a></div>
          <noscript>Per usare ODISSEO attiva JavaScript oppure <a href="<?php echo esc_url($app_url); ?>">apri l'applicativo in una nuova scheda</a>.</noscript>
        </div>
        <iframe data-mm-od-frame data-src="<?php echo esc_url($app_url); ?>" title="ODISSEO — dimostrazione interattiva di sopralluoghi e non conformità" loading="lazy" sandbox="allow-scripts allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer" hidden></iframe>
      </div>
      <p class="mm-od-footnote">Nessun invio di email, nessun backend e nessun salvataggio automatico. La demo non attesta conformità o risultati reali.</p>
    </section>
    <?php $odisseo = ob_get_clean();
    return $chooser . $output . $odisseo;
}
add_filter('do_shortcode_tag', 'mm_od_lab_append_after_titanium', 15, 4);
// Non crea pagine, non tocca il database, non modifica TITANIUM, ATLAS o il tema.
