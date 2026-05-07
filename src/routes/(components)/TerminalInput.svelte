<script lang="ts">
    interface InputProps {
        enter: ( input: string ) => void;
        userInput?: string;
        terminalInput?: HTMLElement;
        historyForwards: () => void;
        historyBackwards: () => void;
    }

    let {
        enter,
        userInput = $bindable( "" ),
        terminalInput = $bindable(),
        historyForwards,
        historyBackwards
    }: InputProps = $props();

    const handleKeyUp = ( event: KeyboardEvent ) =>
    {
        if ( event.key === "Enter" )
        {
            enter( userInput );
            userInput = "";
        }
        else if ( event.key === "ArrowUp" )
        {
            historyBackwards();
        }
        else if ( event.key === "ArrowDown" )
        {
            historyForwards();
        }
    };
</script>

<section bind:this={terminalInput}>
    <span>root@ns3086602:/$</span>

    <!-- svelte-ignore a11y_autofocus -->
    <input
        type="text"
        onkeyup={handleKeyUp}
        autofocus
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        bind:value={userInput}
    />
</section>

<style>
    section {
        gap: 0.5rem;
        display: flex;
        padding: 0 0.5rem 0.5rem 0.5rem;
    }

    section > span {
        color: #00ff00;
        white-space: nowrap;
    }

    section > input {
        color: inherit;
        width: 100%;
        border: none;
        padding: 0;
        outline: none;
        font-size: inherit;
        background: none;
        font-family: inherit;
    }
</style>
