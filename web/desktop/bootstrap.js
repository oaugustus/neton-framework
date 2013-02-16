var extVersion = Ext.getVersion().shortVersion;


if (extVersion == 411){
	// enable dynamic loading
	Ext.Loader.setConfig({
	    enabled: true
	});
		
	Ext.Loader.setPath('Ext.ux', APP.EXTJSPATH + '/examples/ux');
	Ext.Loader.setPath('App', 'desktop/app');
	Ext.Loader.setPath('Neton', 'desktop/ux');
} else {
	/**
	 * Define as rotas da aplicação.
	 */
	Ext.Loader.addClassPathMappings({
	  "Ext.ux": 'desktop/ux/ext',
	  "App": "desktop/app",
	  "Neton": "desktop/ux"
	});	
}
