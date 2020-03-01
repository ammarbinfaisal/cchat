<script>
    let dots = "";
    setInterval(() => {
        if(dots.length < 3) dots += ".";
        else dots = "";
    }, 400);
</script>


<div>
    loading{dots}
</div>