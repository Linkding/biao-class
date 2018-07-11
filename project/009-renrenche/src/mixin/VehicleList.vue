<script>
    export default {
        methods :{
            get_main_cover_url(row){
                return row.preview && row.preview[0] && row.preview[0].url ? 
                    row.preview[0].url : 
                    'https://image.guazistatic.com/gz01180614/15/10/5c7cce2a0d50fc14dfaf4ed0439d395d.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
            }
        }
    }
</script>