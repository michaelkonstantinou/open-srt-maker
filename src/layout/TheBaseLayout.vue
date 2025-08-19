<script setup lang="ts">

import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";

</script>

<template>
  <SidebarInset>
    <!-- Header -->
    <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear
               group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />

        <!-- Slot for Navbar content -->
        <slot name="navbar" />
      </div>
    </header>

    <!-- Main Content -->
    <div class="gap-4 p-4 pt-0">
      <slot />
    </div>
  </SidebarInset>
</template>

<style scoped>

</style>